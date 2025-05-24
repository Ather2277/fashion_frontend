import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { showRazorpayPayment } from '@/components/Payment/payment';
import { Plus, Minus, CreditCard, Coins, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTokens } from '@/contexts/TokenContext';
import { useAuth } from '@/contexts/AuthContext'; // ✅ NEW: to refresh user tokens after purchase
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID.replace(/"/g, ''));

const account = new Account(client);
const databases = new Databases(client);

export function TokenDisplay() {
  const { tokens, isLoadingTokens } = useTokens();
  const { refreshUser } = useAuth(); // ✅ get refreshUser function
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customTokenAmount, setCustomTokenAmount] = useState(5);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const updateUserTokensInDB = async (amount: number) => {
    if (!userId) {
      console.error("User ID not found");
      toast.error("User not logged in.");
      return;
    }
  
    try {
      const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID.replace(/"/g, "");
      const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS.replace(/"/g, "");
  
      let currentTokens = 0;
  
      try {
        const response = await databases.getDocument(databaseId, collectionId, userId);
        currentTokens = typeof response.tokens === 'number' ? response.tokens : 0;
      } catch (err: any) {
        if (err.code === 404) {
          console.log("User document not found. Creating new document.");
          
          const user = await account.get();
  
          await databases.createDocument(databaseId, collectionId, userId, {
            userName: user.name?.replace(/\s/g, '').toLowerCase() || "unknownuser",
            name: user.name || "Unknown User",
            email: user.email || "unknown@example.com",
            tokens: 0,
            freetokens: 1,
          });
  
          currentTokens = 0;
        } else {
          throw err;
        }
      }
  
      await databases.updateDocument(databaseId, collectionId, userId, {
        tokens: currentTokens + amount,
      });

      await refreshUser(); // ✅ Refresh user data from server
      toast.success("Tokens updated successfully!");
    } catch (err: any) {
      console.error("Failed to update tokens:", err);
      toast.error("Failed to update tokens.");
    }
  };

  const handleTokenPurchase = async (amount: number, price: number) => {
    setIsDialogOpen(false);
    const success = await showRazorpayPayment({
      amount: price,
      name: "Rajat",
      email: "rajat@rajat.com",
      phone: "9899999999",
    });

    if (success) {
      await updateUserTokensInDB(amount);
      // setIsDialogOpen(false);
      toast.success(`Successfully purchased ${amount} tokens for ₹${price}`);
    } else {
      toast.error("Payment failed or was cancelled.");
    }
  };

  const handleCustomTokenPurchase = () => {
    const price = customTokenAmount * 15;
    handleTokenPurchase(customTokenAmount, price);
  };

  const incrementTokens = () => setCustomTokenAmount((prev) => prev + 1);
  const decrementTokens = () => setCustomTokenAmount((prev) => (prev > 1 ? prev - 1 : 1));
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setCustomTokenAmount(value);
    else if (e.target.value === '') setCustomTokenAmount(1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < 2) {
      setCurrentSlide(prev => prev + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (isLoadingTokens) {
    return (
      <Card className="bg-white shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="animate-pulse h-8 bg-gray-100 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-medium text-sm sm:text-base">Available Tokens: {tokens}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-sm sm:text-base">
                <Plus className="h-4 w-4 mr-1" />
                Add Tokens
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">Purchase Tokens</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Select a token package or customize your own amount.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Mobile Carousel */}
                <div className="sm:hidden relative">
                  <div 
                    ref={carouselRef}
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {[{ tokens: 10, price: 150 }, { tokens: 25, price: 350 }, { tokens: 50, price: 650 }].map(
                        (option, index) => (
                          <div
                            key={index}
                            className="w-full flex-shrink-0 px-1 flex justify-center"
                          >
                            <div className="max-w-[200px] w-full rounded-2xl shadow-xl bg-gradient-to-b from-[#b388ff] to-[#7c4dff] text-white p-2 text-center flex flex-col justify-between min-h-[200px] h-[220px]">
                              <div>
                                <div className="text-base font-bold mt-6 mb-3">{option.tokens} Tokens</div>
                                <div className="text-lg font-extrabold mb-5">₹ {option.price}</div>
                                <div className="text-xs mb-2">Generate {option.tokens} unique AI outfits</div>
                              </div>
                              <Button
                                className="bg-black text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg hover:bg-gray-900 transition w-full mt-auto mb-3"
                                onClick={() => handleTokenPurchase(option.tokens, option.price)}
                              >
                                BUY NOW
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  
                  {/* Carousel Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-3">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentSlide === index ? 'bg-[#7c4dff]' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[{ tokens: 10, price: 150 }, { tokens: 25, price: 350 }, { tokens: 50, price: 650 }].map(
                    (option, index) => (
                      <div
                        key={index}
                        className="w-full rounded-3xl shadow-xl bg-gradient-to-b from-[#b388ff] to-[#7c4dff] text-white p-6 text-center flex flex-col justify-between min-h-[220px]"
                      >
                        <div>
                          <div className="text-2xl font-bold mb-2">{option.tokens} Tokens</div>
                          <div className="text-3xl font-extrabold mb-6">₹ {option.price}</div>
                          <div className="text-base mb-6">Generate {option.tokens} unique AI outfits</div>
                        </div>
                        <Button
                          className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-900 transition w-full mt-auto"
                          onClick={() => handleTokenPurchase(option.tokens, option.price)}
                        >
                          BUY NOW
                        </Button>
                      </div>
                    )
                  )}
                </div>

                <div className="border-t pt-4 mt-2">
                  <Label htmlFor="custom-amount" className="mb-2 block text-sm sm:text-base">Custom Amount</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementTokens} 
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>

                    <Input
                      id="custom-amount"
                      type="number"
                      min="1"
                      value={customTokenAmount}
                      onChange={handleCustomAmountChange}
                      className="text-center text-sm sm:text-base h-8 sm:h-10"
                    />

                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementTokens} 
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                    <div className="font-medium text-sm sm:text-base">Total Price: ₹{customTokenAmount * 15}</div>
                    <Button 
                      onClick={handleCustomTokenPurchase}
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Purchase {customTokenAmount} Tokens
                    </Button>
                  </div>
                </div>

                <div className="text-center text-xs sm:text-sm text-gray-500 mt-2">
                  Each token allows you to generate one design
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

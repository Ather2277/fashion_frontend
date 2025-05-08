import { useEffect, useState } from 'react';
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
import { Plus, Minus, CreditCard, Coins } from 'lucide-react';
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
            <span className="font-medium">Available Tokens: {tokens}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Add Tokens
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Purchase Tokens</DialogTitle>
                <DialogDescription>
                  Select a token package or customize your own amount.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{ tokens: 10, price: 150 }, { tokens: 25, price: 350 }, { tokens: 50, price: 650 }].map(
                    (option, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <div className="font-bold text-lg">{option.tokens} Tokens</div>
                          <div className="text-gray-500 mb-4">₹{option.price}</div>
                          <Button
                            className="w-full"
                            onClick={() => handleTokenPurchase(option.tokens, option.price)}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Buy Now
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>

                <div className="border-t pt-4 mt-2">
                  <Label htmlFor="custom-amount" className="mb-2 block">Custom Amount</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={decrementTokens} className="h-10 w-10">
                      <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                      id="custom-amount"
                      type="number"
                      min="1"
                      value={customTokenAmount}
                      onChange={handleCustomAmountChange}
                      className="text-center"
                    />

                    <Button variant="outline" size="icon" onClick={incrementTokens} className="h-10 w-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="font-medium">Total Price: ₹{customTokenAmount * 15}</div>
                    <Button onClick={handleCustomTokenPurchase}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Purchase {customTokenAmount} Tokens
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-2">
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

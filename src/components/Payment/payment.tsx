// payment.ts
export async function loadRazorpayScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface PaymentOptions {
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
}

export async function showRazorpayPayment({
  amount,
  name = "Rajat",
  email = "rajat@rajat.com",
  phone = "9899999999",
}: PaymentOptions): Promise<boolean> {
  const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return false;
  }

  try {
    const data = await fetch("https://payment-api-6yfs.onrender.com/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }).then((t) => t.json());

    return new Promise((resolve) => {
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Donation",
        description: "Thank you for nothing. Please give us some money",
        image: "https://payment-api-6yfs.onrender.comlogo.svg",
        handler: function (response: any) {
          console.log("Payment Successful:", response);
          alert("Transaction successful");
          resolve(true);
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        modal: {
          ondismiss: function () {
            resolve(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    alert("Failed to fetch payment details. Check backend logs.");
    return false;
  }
}

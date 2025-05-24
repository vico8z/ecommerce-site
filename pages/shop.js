import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const products = [
  {
    id: 1,
    name: "T-shirt unisexe",
    description: "T-shirt 100% coton, disponible en plusieurs tailles.",
    price: 2599,
    image: "https://via.placeholder.com/300x400?text=T-shirt",
  },
  {
    id: 2,
    name: "Sweat à capuche",
    description: "Sweat confortable, idéal pour l'hiver.",
    price: 4599,
    image: "https://via.placeholder.com/300x400?text=Sweat",
  },
  {
    id: 3,
    name: "Jean slim",
    description: "Jean slim fit, coupe moderne.",
    price: 5999,
    image: "https://via.placeholder.com/300x400?text=Jean",
  },
];

export default function Shop() {
  const handleCheckout = async (product) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Card key={product.id} className="rounded-2xl shadow p-4">
          <img src={product.image} alt={product.name} className="rounded-xl w-full h-64 object-cover mb-4" />
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-base text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold mb-4">{(product.price / 100).toFixed(2)}€</p>
            <Button onClick={() => handleCheckout(product)}>Acheter</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
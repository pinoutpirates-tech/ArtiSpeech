import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { VoiceAssistant } from "./VoiceAssistant";

interface AddProductProps {
  language: string;
  onBack: () => void;
  onProductAdded: (product: any) => void;
  goToStall?: () => void; // navigate to catalogue
}

// A simple, client-side function to parse voice input
const parseProductInput = (input: string) => {
  let nameEn = "Untitled Product";
  let nameLocal = input;
  let price = "";
  let descriptionEn = "No description available";
  let descriptionLocal = "विवरण उपलब्ध नहीं है";

  // Regex to find price and name
  const match = input.match(/(.+?)\s+(\d+)\s*$/);
  if (match) {
    const rawName = match[1].trim();
    price = match[2];
    nameLocal = rawName;

    // A simple, rule-based transliteration
    let tempName = rawName.toLowerCase();
    tempName = tempName.replace(/kaali|kali/g, 'black'); // Convert 'काली'
    tempName = tempName.replace(/saari|sari/g, 'saree'); // Convert 'साड़ी'
    tempName = tempName.replace(/\b(rs|rupees|is)\b/g, '').trim(); // Remove 'rs', 'rupees', and 'is'

    // Capitalize the first letter of each word
    nameEn = tempName.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    descriptionEn = `A product named ${nameEn.toLowerCase()} with a price of ₹${price}.`;
    descriptionLocal = `एक उत्पाद जिसका नाम ${nameLocal} है, और जिसकी कीमत ₹${price} है।`;
  }

  return {
    name: nameEn,
    price,
    description: descriptionEn,
    transcriptLang: nameLocal,
    transcriptEn: nameEn,
    descriptionLang: descriptionLocal,
  };
};

const speak = (text: string, lang: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Set language for pronunciation
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Text-to-speech not supported in this browser.");
  }
};

export const AddProduct: React.FC<AddProductProps> = ({
  language,
  onBack,
  onProductAdded,
  goToStall,
}) => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    transcriptLang: "",
    transcriptEn: "",
    descriptionLang: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhoto(url);
      setStep(2);
    }
  };

  const handleVoiceInput = async (text: string) => {
    const parsedData = parseProductInput(text);
    setProductDetails(parsedData);
    setStep(3);

    // AI reads the parsed description and asks for confirmation
    const confirmationTextEn = `Product name: ${parsedData.name}. Price: ${parsedData.price} rupees. Description: ${parsedData.description}. Please click Confirm and Save to continue.`;
    speak(confirmationTextEn, 'en-US');

    // For a bilingual experience, you can also have it speak in the local language
    const confirmationTextLocal = `उत्पाद का नाम: ${parsedData.transcriptLang}, कीमत: ${parsedData.price} रुपये, विवरण: ${parsedData.descriptionLang}. जारी रखने के लिए पुष्टि करें और सहेजें पर क्लिक करें।`;
    // Note: The 'language' prop would determine which one to use
  };

  const handleConfirm = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: productDetails.name,
      price: Number(productDetails.price) || 0,
      description: productDetails.description,
      image: photo || "",
      timestamp: new Date().toISOString(),
    };
    onProductAdded(newProduct);

    // Stop any ongoing speech before navigating
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Now, navigate to the next page
    if (goToStall) {
      goToStall();
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="glow-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Add Product</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i === step
                  ? "bg-primary text-primary-foreground glow-primary"
                  : i < step
                  ? "bg-accent-gold text-accent-gold-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 - Photo */}
      {step === 1 && (
        <div className="text-center">
          <p className="mb-4 font-medium">Please add a photo of your product</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <div className="p-6 border-2 border-dashed rounded-lg hover:bg-muted/30">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Click to upload or take a picture
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Step 2 - Voice */}
      {step === 2 && (
        <div className="text-center">
          <p className="mb-4">
            Now, please tell me the product name, price, and a short description
          </p>
          <VoiceAssistant
            language={language}
            onCommand={handleVoiceInput}
            className="mx-auto"
            size="large"
            mode="input"
          />
        </div>
      )}

      {/* Step 3 - Review */}
      {step === 3 && (
        <Card className="p-4">
          <CardContent>
            {photo && (
              <img
                src={photo}
                alt="Product"
                className="w-32 h-32 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-bold mb-2">Review Product</h2>

            {/* Product Name */}
            <p className="text-sm font-medium">
              <strong>Name:</strong> {productDetails.name}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              ({productDetails.transcriptLang})
            </p>

            {/* Price */}
            <p className="mb-2">
              <strong>Price:</strong> ₹{productDetails.price}
            </p>

            {/* Description */}
            <p className="mb-2">
              <strong>Description:</strong> {productDetails.description}
            </p>
            <p className="text-xs text-muted-foreground">
              ({productDetails.descriptionLang})
            </p>

            <Button
              onClick={handleConfirm}
              className="mt-4 w-full flex items-center gap-2"
            >
              <CheckCircle className="h-5 w-5" /> Confirm & Save
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
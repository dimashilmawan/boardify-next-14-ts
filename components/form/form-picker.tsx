"use client";

import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { defaultImages } from "@/constants/images";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ["23"],
          count: 9,
        });
        console.log(res);
        if (res.errors) throw new Error("Error while retrieving photos");
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 />
      </div>
    );
  }
  return <div>FormPicker</div>;
};

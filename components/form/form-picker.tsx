"use client";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { defaultImages } from "@/constants/images";
import { Random } from "unsplash-js/dist/methods/photos/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormErrors } from "./form-errors";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Random[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        switch (res.type) {
          case "success":
            const fetchedImages = res.response as Random[];
            setImages(fetchedImages);
            break;

          case "error":
            throw new Error();
        }
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
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 ">
        {images.map((image) => {
          return (
            <button
              key={image.id}
              type="button"
              className={cn(
                "group relative aspect-[16/10] overflow-hidden rounded-md bg-muted transition ",
                pending && "cursor-wait opacity-50",
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImageId(image.id);
              }}
            >
              <input
                type="radio"
                id={image.id}
                name={id}
                disabled={pending}
                readOnly
                checked={selectedImageId === image.id}
                defaultValue={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}|${image.color}`}
                className="hidden"
              />
              <Image
                fill
                src={image.urls.thumb}
                alt="unsplash image thumb"
                sizes="97vw"
                className="object-cover"
              />
              {selectedImageId === image.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="absolute inset-x-0 bottom-0 truncate bg-black/60 p-1 text-center text-[10px] text-white opacity-100 transition group-hover:opacity-100 lg:opacity-0"
              >
                {image.user.name}
              </Link>
            </button>
          );
        })}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

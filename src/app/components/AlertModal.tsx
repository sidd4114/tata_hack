"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function AlertModal({ open, onOpenChange, details }: { open: boolean; onOpenChange: (open: boolean) => void; details: string; }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-lg animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-bold">Explainable AI Alert</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Cross2Icon /></button>
            </Dialog.Close>
          </div>
          <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{details}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 
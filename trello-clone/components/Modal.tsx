"use client";

import { FormEvent, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "@/components/TaskTypeRadioGroup";
import { useRef } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/20/solid";

export default function Modal() {
  const {
    addTask,
    image,
    setImage,
    newTaskType,
    newTaskInput,
    setNewTaskInput,
  } = useBoardStore();
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  };

  const imagePickerRef = useRef<HTMLInputElement>(null);

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModal}
      >
        {/* there are two Transition.Child components. The first one creates a background overlay when the modal is visible, and the second one animates the modal content. */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* This div is to give the background blurry effect when the modal is open */}
          <div className="fixed inset-0 bg-black bg-opacity-25  " />
        </Transition.Child>

        {/* overflow-y-auto: enables vertical scrolling when the content exceeds the viewport height. */}
        {/* This div spans across the whole page */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* This div is to center the modal content */}
          {/* items-center: center the flexbox vertically */}
          {/* justify-center: center the flexbox horizontally */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* This is the start of the dialog panel */}
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>
                {/* This is for the input field */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                {/* This is for the radio group */}
                <TaskTypeRadioGroup />

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click(); // when this button is clicked anywhere, it will trigger and actually click the hidden input element
                    }}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      alt="uploaded image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef} // imagePickerRef is a reference to the hidden input element
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                  <div className="mt-2">
                    {/* focus-visible: receives focus, but only if the user is interacting with the page using a keyboard or similar input device */}
                    <button
                      type="submit"
                      className="bg-blue-100 text-blue-900 p-2 rounded-md focus-visible:ring-2 focus-visible:ring-blue-900 focus:outline-none focus-visible:ring-offset-2 disabled:text-gray-300 disabled:bg-gray-100"
                      disabled={!newTaskInput}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

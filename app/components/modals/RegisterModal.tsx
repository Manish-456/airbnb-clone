"use client";
import useRegisterModal from "@/app/hooks/useRegister";
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLogin";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!")
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong!!")
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
     <Heading title="Welcome to Airbnb" subtitle="Create an account"  />
     <Input  disabled={isLoading} register={register} id="email" type="email" label="Email" errors={errors} required  />
     <Input  disabled={isLoading} register={register} id="name" type="text" label="Name" errors={errors} required  />
     <Input disabled={isLoading}  register={register} type="password" id="password" label="Password" errors={errors} required  />
    </div>
  )

  const toggleModal = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
     <hr />
     <Button label={"Continue with google"} outline icon={FcGoogle} onClick={() => signIn("google")}  />
     <Button label={"Continue with Github"} outline icon={AiFillGithub} onClick={() => signIn("github")}  />
     <div className="text-neutral-500 text-center mt-4 font-light">
      <div className="flex flex-row justify-center items-center gap-2">
      <div>
        Already have an account
      </div>
     <div 
     onClick={toggleModal}
     className="
     text-neutral-800
     cursor-pointer
     hover:underline
     ">
      Login
     </div>
       </div>

     </div>
    </div>
  )

  return <Modal disabled={isLoading} isOpen={registerModal.isOpen} body={bodyContent} title="Register" actionLabel="Continue" footer={footerContent} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)}
  />
}

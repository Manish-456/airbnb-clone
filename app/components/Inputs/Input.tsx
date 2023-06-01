'use client';

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
interface InputProps {
    id : string,
    type?: string,
    label? : string,
    disabled? : boolean,
    formatPrice? : boolean,
    required? : boolean,
    register : UseFormRegister<FieldValues>,
    errors : FieldErrors
}
export default function Input({
 id,
 register,
 errors,
 type,
 label,
 disabled,
 required,
 formatPrice
} : InputProps) {
  return (
    <div className='w-full relative'>
      {
        formatPrice && (
            <BiDollar size={24} className='text-neutral-700 absolute top-4 left-2' />
        )
      }
      <input
      className={
        ` 
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'focus:border-rose-500 border-rose-500' : 'focus:border-black border-black'}
        
        `
      }
      type={type} id={id} disabled={disabled} {...register(id, {required})}
      placeholder=''
      />

      <label className={
        `
        absolute
        text-md
        duration-150
        transform
        -translate-y-2
        origin-[0]
        top-5
        z-10
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : 'text-zinc-400'}
        `
      }>
        {label}
      </label>
    </div>
  )
}

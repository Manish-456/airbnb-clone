"use client";

import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props  {
    title : string,
    subtitle : string,
    value : number,
    onChange : (value : number) => void;
}

export default function Counter({
    title,
    subtitle,
    value,
    onChange
}: Props) {
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
    if(value === 1) return;
    onChange(value - 1);
    }, [onChange, value])
  return (
    <div 
    className='flex flex-row justify-between items-center'
    >
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="font-light text-gray-600">
                {subtitle}
            </div>
             


        </div>
        <div className="flex flex-row items-center gap-4">
            <div onClick={onReduce} className='
            w-10
            h-10
            rounded-full
            border-[1px]
            flex
            border-neutral-400
            items-center
            justify-center
            text-neutral-600
            hover:opacity-80
            transition
            cursor-pointer
            '>
                <AiOutlineMinus />

            </div>
            <div className="font-light text-xl text-neutral-600">
                {value}
            </div>
            <div onClick={onAdd} className='
            w-10
            h-10
            rounded-full
            border-[1px]
            flex
            border-neutral-400
            items-center
            justify-center
            text-neutral-600
            hover:opacity-80
            transition
            cursor-pointer
            '>
                <AiOutlinePlus />

            </div>
        </div>
    </div>
  )
}
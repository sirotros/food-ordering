import Image from "next/image";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "./Title";
import { MdCancel } from "react-icons/md";

const Search = ({ setIsSearchModal }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
            <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
                <div className="w-full h-full grid place-content-center relative ">
                    <div className="relative z-50 md:w-[600px] h-[600px] w-[370px] bg-white rounded-3xl border-2 p-10">
                        <Title className="text-[40px] text-center">Search</Title>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border w-full my-10"
                        />
                        <ul>
                            <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                <div className="relative flex">
                                    <Image src="/images/f1.png" alt="" width={48} height={48} />
                                </div>
                                <span className="font-bold">Good Pizza</span>
                                <span className="font-bold">$10</span>
                            </li>
                            <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                <div className="relative flex">
                                    <Image src="/images/f1.png" alt="" width={48} height={48} />
                                </div>
                                <span className="font-bold">Good Pizza</span>
                                <span className="font-bold">$10</span>
                            </li>
                            <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                <div className="relative flex">
                                    <Image src="/images/f1.png" alt="" width={48} height={48} />
                                </div>
                                <span className="font-bold">Good Pizza</span>
                                <span className="font-bold">$10</span>
                            </li>
                        </ul>
                        <button
                            className="absolute top-4 right-4"
                            onClick={() => setIsSearchModal(false)}
                        >
                            <MdCancel size={25} className=" transition-all hover:text-primary" />
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default Search;
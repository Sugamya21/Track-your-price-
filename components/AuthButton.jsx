"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { LogIn, LogOut} from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react"; 
import {signOut} from "@/app/actions";

const AuthButton = ({user}) => {
    const[showAuthModal,setShowAuthModal]=useState(false);

    if(user){
        return (
            <form action={signOut}>
                <Button variant='ghost' size='sm' type='submit' className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign out
                </Button>
            </form>
        );
    }

    return (
        <>
        <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 gap-2"
        >
          <LogIn className="w-4 h-4" />
          Sign in
        </Button>

        <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        />
        </>
    );
};

export default AuthButton;
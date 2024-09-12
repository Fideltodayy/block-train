import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "./ui/select";

const Heroes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmitlesson = () => {
    if (auth?.accessToken) {
      navigate("/submit-lesson");
    } else {
      if (
        window.confirm(
          "You need to be logged in to submit an lesson. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "submit-lesson" } });
      }
    }
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className=" h-screen flex flex-col items-center justify-center text-center bg-gradient-to-t from-orange-100 to-red-100">
        <div className="container mx-auto px-6 py-12 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-900 tracking-wide leading-loose mb-6">
            Get incentivised to learn or teach about blockchain
          </h1>
          <p className="text-lg md:text-xl text-orange-900 tracking-wide leading-loose mb-12">
            Grursus mal suada faci lisis Lorem ipsum dolor sit ametion
            consectetur adipiscing elit
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:text-orange-500 border-2 transition"
            >
              Offer lessons
            </Button>
            <Button
              onClick={() => navigate("/submit-lesson")}
              variant="outline"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:text-orange-500 border-2 transition"
            >
              Request a lesson
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heroes;

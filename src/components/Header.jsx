import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../lib/redux-toolkit/slices/todo-slice";
import { openAddModal, openLoginModal } from "../lib/redux-toolkit/slices/modal-slice";
import { Button } from "./ui/button";
import { PlusCircle, LogIn } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  function handleFilter(priority) {
    dispatch(setFilter({ priority }));
  }

  function handleAddClick() {
    if (token) {
      dispatch(openAddModal());
    } else {
      dispatch(openLoginModal());
    }
  }

  return (
    <header className="py-5 shadow-md fixed left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>

        <div className="flex items-center gap-5">
          <strong>Daraja bo'yicha filterlash:</strong>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Daraja bo'yicha filterlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="low">Quyi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAddClick} className="flex items-center gap-2">
          <PlusCircle />
          {token ? "New" : <><LogIn /> Login</>}
        </Button>
      </div>
    </header>
  );
}

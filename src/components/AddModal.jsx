import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewTodoForm from "./AddNewTodoForm";

export default function AddModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi todo qo'shish</DialogTitle>
          <DialogDescription>
            Siz bu yerda yangi todo qo'shishingiz mumkin
          </DialogDescription>
        </DialogHeader>
        <AddNewTodoForm />
      </DialogContent>
    </Dialog>
  );
}

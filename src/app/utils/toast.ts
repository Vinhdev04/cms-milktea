import { toast } from "sonner";

const successSound = "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";
const errorSound = "https://assets.mixkit.co/active_storage/sfx/2192/2192-preview.mp3";

const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.volume = 0.5;
  audio.play().catch(err => console.log("Audio play failed:", err));
};

export const showToast = {
  success: (message: string) => {
    playSound(successSound);
    toast.success(message);
  },
  error: (message: string) => {
    playSound(errorSound);
    toast.error(message);
  },
  loading: (message: string) => {
    toast.loading(message);
  },
  dismiss: () => {
    toast.dismiss();
  }
};

import { toast } from "sonner";

const successSound = "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";
const errorSound = "https://assets.mixkit.co/active_storage/sfx/2192/2192-preview.mp3";

const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.volume = 0.5;
  audio.play().catch(err => console.log("Audio play failed:", err));
};

export const showToast = {
  success: (message: string, options?: any) => {
    playSound(successSound);
    return toast.success(message, options);
  },
  error: (message: string, options?: any) => {
    playSound(errorSound);
    return toast.error(message, options);
  },
  loading: (message: string, options?: any) => {
    return toast.loading(message, options);
  },
  dismiss: () => {
    toast.dismiss();
  }
};

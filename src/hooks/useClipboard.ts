

import { message } from "antd";

const useClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("Copy thành công!"); 
    } catch (error) {
      message.error("Copy không thành công!");
    }
  };

  return { copyToClipboard };
};

export default useClipboard;
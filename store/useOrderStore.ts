import { create } from 'zustand';

interface OrderState {
  prompt: string;
  name: string;
  nim: string;
  major: string;
  isSubmitting: boolean;
  transactionId: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  answerUrl: string;
}

interface OrderActions {
  setPrompt: (newPrompt: string) => void;
  setUserInfo: (data: { name: string; nim: string; major: string }) => void;
  setSubmitting: (status: boolean) => void;
  setTransaction: (id: string, status: 'pending' | 'success' | 'failed') => void;
  setAnswerUrl: (url: string) => void;
  resetOrder: () => void;
}

type OrderStore = OrderState & OrderActions;

const initialState: OrderState = {
  prompt: '',
  name: '',
  nim: '',
  major: '',
  isSubmitting: false,
  transactionId: '',
  paymentStatus: 'pending',
  answerUrl: '',
};

const useOrderStore = create<OrderStore>((set) => ({
  ...initialState,
  setPrompt: (newPrompt) => set({ prompt: newPrompt }),
  setUserInfo: (data) => set({ name: data.name, nim: data.nim, major: data.major }),
  setSubmitting: (status) => set({ isSubmitting: status }),
  setTransaction: (id, status) => set({ transactionId: id, paymentStatus: status }),
  setAnswerUrl: (url) => set({ answerUrl: url }),
  resetOrder: () => set(initialState),
}));

export default useOrderStore;

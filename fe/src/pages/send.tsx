import { useState } from "react";

type SendProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  username: string;
};

export default function Send({
  isOpen,
  onClose,
  onConfirm,
  username,
}: SendProps) {
  const [amount, setAmount] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Funds</h3>
        <p className="text-sm text-gray-600 mb-4">
          Sending to <span className="font-semibold">@{username}</span>
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount ($)
        </label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(amount)}
            disabled={amount <= 0}
            className={`px-4 py-2 rounded-xl font-semibold text-white transition ${
              amount > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Send ${amount || ""}
          </button>
        </div>
      </div>
    </div>
  );
}

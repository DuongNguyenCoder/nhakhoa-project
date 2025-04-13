import { useNavigate } from "react-router-dom";

const BuyNowButton = ({ product, quantity = 1 }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        items: [{ ...product, quantity }],
        from: "buy-now"
      },
    });
  };

  return (
    <button onClick={handleBuyNow} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
      Mua Ngay
    </button>
  );
};

export default BuyNowButton;

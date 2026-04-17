

const BuyNowButton = ({ onclick}) => {

  return (
    <button onClick={onclick} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
      Mua Ngay
    </button>
  );
};

export default BuyNowButton;

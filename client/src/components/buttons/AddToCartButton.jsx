const AddToCartButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded flex items-center justify-center gap-2">
      <i className="fa fa-cart-plus" />
      Thêm Vào Giỏ Hàng
    </button>
  );
};

export default AddToCartButton;

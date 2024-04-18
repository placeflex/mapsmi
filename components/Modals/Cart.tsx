import Image from "next/image";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleDeleteItem } from "@/redux/cart";

// constatns
import { productNames } from "@/constants/constants";
import { MATERIAL_PRICES, FRAMES_PRICES } from "@/layouts/wallartAttributes";

// icons
import Delete from "@/public/icons/close.svg";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useTypedSelector(({ cart }) => cart?.cart);

  return (
    <div className="w-full h-full">
      <h3 className="text-h3 mb-[5rem]">Basket</h3>

      <div className="flex flex-col">
        {cartItems.map((item: any, index: number) => {
          const { selectedAttributes } = item;

          const price =
            item?.selectedAttributes?.frame?.id !== 0
              ? MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
                  item.selectedAttributes.size.id
                ].price +
                FRAMES_PRICES[item?.selectedAttributes?.frame?.id]?.price
              : MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
                  item.selectedAttributes.size.id
                ].price;

          return (
            <div key={index} className="mb-[2rem]">
              <div className="flex items-start gap-[2rem]">
                <div className="flex items-center">
                  <Image
                    src={item.path}
                    alt={"cart item"}
                    width={200}
                    height={200}
                    quality={100}
                    className="object-cover"
                  />
                  <div className="ml-[2rem] w-[50%]">
                    <h3 className="text-body mb-[.5rem] truncate">
                      {productNames[item.productId]} poster
                    </h3>
                    <h4 className="text-bodySmall mb-[.4rem]">
                      {selectedAttributes.orientation.name} -{" "}
                      {selectedAttributes.size.name}
                    </h4>

                    <p className="text-captionSmall font-bold">
                      Price : {price} $
                    </p>
                  </div>
                </div>
                <button onClick={() => dispatch(handleDeleteItem(item))} className="ml-auto">
                  <Delete width={24} stroke="#000" fill="#000" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

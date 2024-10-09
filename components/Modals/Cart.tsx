import Image from "next/image";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/stores/store";
import { handleDeleteItem } from "@/stores/cart";
import { handleCloseModals } from "@/stores/modals";

// components
import { Button } from "@/components/Button";

// constatns
import { productNames } from "@/constants/constants";
import { MATERIAL_PRICES, frames } from "@/layouts/wallartAttributes";

// icons
import Delete from "@/public/icons/close.svg";
import { useRouter } from "next/router";

export const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useTypedSelector(({ cart }) => cart?.cart);

  const RESULT_PRICE = cartItems?.reduce((acc, item: any) => {
    const RESULT_PRICE = item?.selectedAttributes?.frame?.type
      ? MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
          item.selectedAttributes.size.id
        ].price +
        frames[item?.selectedAttributes?.size?.id]?.[
          item?.selectedAttributes?.frame?.id
        ]?.price
      : MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
          item.selectedAttributes.size.id
        ].price;

    const itemPrice = RESULT_PRICE;
    const itemQuantity = item.quantity || 1; // ураховуємо поле quantity

    return acc + itemPrice * itemQuantity; // додаємо ціну кожного товару до загальної суми, помножену на його кількість
  }, 0);
  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-body pb-[2rem] mb-[2rem] border-b border-secondaryBg leading-[1]">
        Basket
      </h3>

      <div className="flex flex-col">
        {!cartItems.length ? (
          <div className="text-center mt-[12rem]">
            <h3 className="text-bodyBold">
              There&apos;s nothing in your <br /> shopping cart yet.
            </h3>
            <p className="text-bodySmall mt-[1rem]">
              Don&apos;t know where to start? Here are some of our <br /> most
              popular products:
            </p>
          </div>
        ) : null}

        {cartItems.map((item: any, index: number) => {
          const { selectedAttributes } = item;

          const RESULT_PRICE = item?.selectedAttributes?.frame?.type
            ? MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
                item.selectedAttributes.size.id
              ].price +
              frames[item?.selectedAttributes?.size?.id]?.[
                item?.selectedAttributes?.frame?.id
              ]?.price
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
                      {productNames[item.productId]}
                    </h3>
                    <h4 className="text-bodySmall mb-[.4rem]">
                      {selectedAttributes.orientation.name} -{" "}
                      {selectedAttributes.size.name}
                    </h4>

                    <p className="text-captionSmall font-bold">
                      Price: {RESULT_PRICE} €
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(handleDeleteItem(item))}
                  className="ml-auto"
                >
                  <Delete width={24} stroke="#000" fill="#000" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length ? (
        <>
          {/* <div className="mt-auto text-bodySmall">Total: {RESULT_PRICE}</div> */}
          <Button
            // href="/cart"
            variant="contained"
            color="primary"
            className="mt-auto text-bodySmall text-center"
            onClick={() => {
              router.push("/cart");
              dispatch(handleCloseModals());
            }}
          >
            Checkout
          </Button>
        </>
      ) : null}
    </div>
  );
};

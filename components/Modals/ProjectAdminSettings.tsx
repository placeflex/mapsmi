import { useRouter } from "next/router";

// components
import { ModalContent } from "./ModalContent";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import {
  handleAddToPopularProjects,
  handleDeletePopularProject,
  handleUpdatePopularProject,
} from "@/redux/popular-wallarts";
import { setWallartAdminSettings } from "@/redux/layout";

import { MATERIAL_PRICES, frames } from "@/layouts/wallartAttributes";

import {
  design_category,
  cities,
  design_type,
  gift,
  product_type,
  orientation,
  featured,
} from "@/constants/wallart-categories";

export const ProjectAdminSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id, id, from } = router.query;
  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const price = layout?.selectedAttributes?.frame?.type
    ? MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
        layout.selectedAttributes.size.id
      ].price +
      frames[layout?.selectedAttributes?.size?.id]?.[
        layout?.selectedAttributes?.frame?.id
      ]?.price
    : MATERIAL_PRICES[layout?.selectedAttributes?.material?.id]?.prices[
        layout.selectedAttributes.size.id
      ].price;

  const handleAddPupularProject = () => {
    dispatch(handleAddToPopularProjects({ id: product_id, price }));
  };

  const handleUpdateProject = () => {
    dispatch(handleUpdatePopularProject({ id: product_id, price }));
  };

  const handleDeleteFromPupularProject = () => {
    const callback = () => {
      const { from, ...query } = router.query;

      router.push({
        query: query,
      });
    };

    dispatch(
      handleDeletePopularProject({ id: product_id, callback: callback })
    );
  };

  const handleSetWallartAdminSettings = (field, value) => {
    dispatch(setWallartAdminSettings({ field: field, value: value }));
  };

  //

  return (
    <div className="w-full">
      <h3 className="text-h5">Administration</h3>

      <div className="mt-[2rem]">
        <Input
          label="Name"
          value={layout.name}
          onChange={value =>
            handleSetWallartAdminSettings("name", value.target.value)
          }
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={design_category}
          mode="multiple"
          allowClear
          className="w-full"
          label="Design Category"
          placeholder="Design Category"
          defaultValue={layout.design_category}
          onChange={value =>
            handleSetWallartAdminSettings("design_category", value)
          }
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={design_type}
          mode="multiple"
          allowClear
          className="w-full"
          label="Design Type"
          placeholder="Design Type"
          defaultValue={layout.design_type}
          onChange={value =>
            handleSetWallartAdminSettings("design_type", value)
          }
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={gift}
          mode="multiple"
          allowClear
          className="w-full"
          label="Gift"
          placeholder="Gift"
          defaultValue={layout.gift}
          onChange={value => handleSetWallartAdminSettings("gift", value)}
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={product_type}
          mode="multiple"
          allowClear
          className="w-full"
          label="Product Type"
          placeholder="Product Type"
          defaultValue={layout.product_type}
          onChange={value =>
            handleSetWallartAdminSettings("product_type", value)
          }
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={orientation}
          mode="multiple"
          allowClear
          className="w-full"
          label="Orientation"
          placeholder="Orientation"
          defaultValue={layout.orientation}
          onChange={value =>
            handleSetWallartAdminSettings("orientation", value)
          }
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={featured}
          mode="multiple"
          allowClear
          className="w-full"
          label="Featured"
          placeholder="Featured"
          defaultValue={layout.featured}
          onChange={value => handleSetWallartAdminSettings("featured", value)}
        />
      </div>

      <div className="mt-[2rem]">
        <SearchSelect
          options={cities}
          mode="multiple"
          allowClear
          className="w-full"
          label="Cities"
          placeholder="Cities"
          defaultValue={layout.cities}
          onChange={value => handleSetWallartAdminSettings("cities", value)}
        />
      </div>

      <div className="mt-[2rem] flex gap-[2rem]">
        <Button
          className="w-full text-link font-semibold"
          type="button"
          onClick={handleAddPupularProject}
          variant="contained"
          color="primary"
        >
          Create new
        </Button>

        {from == "pupular-wallarts" && (
          <Button
            className="w-full text-link font-semibold"
            type="button"
            onClick={handleUpdateProject}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        )}

        {from == "pupular-wallarts" && (
          <Button
            className="w-full text-link font-semibold"
            type="button"
            onClick={handleDeleteFromPupularProject}
          >
            Delete From Popular
          </Button>
        )}
      </div>
    </div>
  );
};

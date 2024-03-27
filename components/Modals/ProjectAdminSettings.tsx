import { useRouter } from "next/router";

// components
import { ModalContent } from "./ModalContent";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/Button";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import {
  handleAddToPopularProjects,
  handleDeletePopularProject,
} from "@/redux/popular-wallarts";
import { setWallartAdminSettings } from "@/redux/layout";

// helpers
import { toast } from "react-toastify";

const design_category = [
  { label: "Family", value: "family" },
  { label: "Travel", value: "travel" },
  { label: "Astrology", value: "astrology" },
  { label: "Life Events", value: "life_events" },
  { label: "Sports", value: "sports" },
  { label: "Couples", value: "couples" },
  { label: "Places", value: "places" },
  { label: "History", value: "history" },
  { label: "Landmarks", value: "landmarks" },
  { label: "Nature", value: "nature" },
  { label: "Design Ideas", value: "design_ideas" },
];

const design_type = [
  { label: "Anniversary", value: "anniversary" },
  { label: "Baseball", value: "baseball" },
  { label: "Basketball", value: "basketball" },
  { label: "Birthday", value: "birthday" },
  { label: "Cycling", value: "cycling" },
  { label: "Falling In Love", value: "falling_in_love" },
  { label: "Football", value: "football" },
  { label: "Formula 1", value: "furmula1" },
  { label: "Graduation", value: "graduation" },
  { label: "NASCAR", value: "nascar" },
  { label: "National Park", value: "national_park" },
  { label: "Natural Wonders", value: "natural_wonders" },
  { label: "Newborn", value: "newborn" },
  { label: "Running", value: "running" },
  { label: "Soccer", value: "soccer" },
  { label: "Triathlon", value: "triathlon" },
  { label: "Wedding", value: "wedding" },
  { label: "Zodiac", value: "zodiac" },
  { label: "City", value: "city" },
  { label: "Island", value: "island" },
  { label: "River", value: "river" },
  { label: "Neighborhood", value: "neighborhood" },
  { label: "Archaeological Sities", value: "archaeological_sities" },
  { label: "IndyCar", value: "indy_car" },
  { label: "Motorcycling", value: "motorcycling" },
  { label: "Hiking", value: "hiking" },
  { label: "Mountain", value: "mountain" },
];

const gift = [
  { label: "Gifts for Athletes", value: "athletes" },
  { label: "Gifts for Couples", value: "couples" },
  { label: "Gifts for Dad", value: "dad" },
  { label: "Gifts for Family", value: "family" },
  { label: "Gifts for Frequent Travelers", value: "frequent_travelers" },
  { label: "Gifts for Friends", value: "friends" },
  { label: "Gifts for Grads", value: "grads" },
  { label: "Gifts for Grandparents", value: "grandparents" },
  { label: "Gifts for Her", value: "her" },
  { label: "Gifts for Him", value: "him" },
  { label: "Gifts for Husband", value: "husband" },
  { label: "Gifts for Kids", value: "kids" },
  { label: "Gifts for Mom", value: "mom" },
  {
    label: "Gifts for Nature & Outdoor Lovers",
    value: "nature_outdoor_lovers",
  },
  { label: "Gifts for Newborns", value: "newborns" },
  { label: "Gifts for Newlyweds", value: "newlyweds" },
  { label: "Gifts for Sports Fans", value: "sports_fans" },
  { label: "Gifts for Students", value: "students" },
  { label: "Gifts for Wife", value: "wife" },
  { label: "Gifts for Anniversaries", value: "anniversaries" },
  { label: "Gifts for Birthdays", value: "birthdays" },
];

const product_type = [
  { label: "Star Maps", value: "star_maps" },
  { label: "Street Maps", value: "street_maps" },
  { label: "Custom Maps", value: "custom_maps" },
  { label: "Line Art", value: "line_art" },
  { label: "Cat Art", value: "cat_art" },
  { label: "Flowers Art", value: "flowers_art" },
];

const orientation = [
  { label: "Landscape", value: "landscape" },
  { label: "Portrait", value: "portrait" },
];

const featured = [
  { label: "On Sale", value: "on_sale" },
  { label: "New Arrivals", value: "new_arrivals" },
  { label: "Staff Picks", value: "staff_picks" },
  { label: "Bundles", value: "bundles" },
];

export const ProjectAdminSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id, id, from } = router.query;
  const layout = useTypedSelector(({ layout }) => layout?.layout);

  const handleAddPupularProject = () => {
    dispatch(handleAddToPopularProjects({ id: product_id }));
  };

  const handleDeleteFromPupularProject = () => {
    dispatch(handleDeletePopularProject({ id: product_id }));
  };

  const handleSetWallartAdminSettings = (field, value) => {
    console.log("field", field);
    console.log("value", value);

    dispatch(setWallartAdminSettings({ field: field, value: value }));
  };

  //

  return (
    <div className="w-full">
      <h3 className="text-h5">Administration</h3>

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

      <div className="mt-[2rem] flex gap-[2rem]">
        <Button
          classNames="w-full text-button font-semibold"
          type="button"
          onClick={handleAddPupularProject}
          variant="contained"
          color="primary"
        >
          Add To Popular
        </Button>

        {from == "pupular-wallarts" && (
          <Button
            classNames="w-full text-button font-semibold"
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

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { ModalContent } from "./ModalContent";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/stores/store";
import {
  handleApplyMarkerForLocation,
  handleChangeLabelPosition,
} from "@/stores/layout";

// helpers
import { toast } from "react-toastify";

// markers
import { mapMarkers } from "@/layouts/wallartSettings/mapMarkers";

export const Markers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id, id, from } = router.query;
  const layout = useTypedSelector(({ layout }) => layout?.layout);
  const currentMarker = useTypedSelector(({ modals }) => modals.markersPanel);

  const [markers, setMarkers] = useState(mapMarkers());

  const handleChangeLabelPos = pos => {
    dispatch(
      handleChangeLabelPosition({
        labelPosition: pos,
        place_id: currentMarker.locationId,
      })
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-h5">Markers</h3>

      <div className="mb-2 mt-2">
        <button className="mx-2" onClick={() => handleChangeLabelPos("top")}>
          top
        </button>
        <button className="mx-2" onClick={() => handleChangeLabelPos("left")}>
          left
        </button>
        <button className="mx-2" onClick={() => handleChangeLabelPos("right")}>
          right
        </button>
        <button className="mx-2" onClick={() => handleChangeLabelPos("bottom")}>
          bottom
        </button>
      </div>

      <div className="flex flex-wrap">
        {markers.map((marker, idx) => {
          return (
            <div
              key={idx}
              className="w-[33.33%] flex justify-center items-center  border-4 cursor-pointer"
              onClick={() =>
                dispatch(
                  handleApplyMarkerForLocation({
                    markerId: marker.id,
                    place_id: currentMarker.locationId,
                  })
                )
              }
            >
              {marker.iconExample}
            </div>
          );
        })}
      </div>
    </div>
  );
};

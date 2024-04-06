import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { ModalContent } from "./ModalContent";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import { handleApplyMarkerForLocation } from "@/redux/layout";

// helpers
import { toast } from "react-toastify";

// markers
import { mapMarkers } from "@/layouts/LayoutSettings/mapColors";

export const Markers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id, id, from } = router.query;
  const layout = useTypedSelector(({ layout }) => layout?.layout);
  const currentMarker = useTypedSelector(({ modals }) => modals.markersPanel);

  const [markers, setMarkers] = useState(mapMarkers());

  return (
    <div className="w-full">
      <h3 className="text-h5">Markers {JSON.stringify(currentMarker)}</h3>

      <div className="flex flex-wrap">
        {markers.map((marker, idx) => {
          return (
            <div
              key={idx}
              className="w-[33.33%] flex justify-center items-center aspect-square border-4 cursor-pointer"
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

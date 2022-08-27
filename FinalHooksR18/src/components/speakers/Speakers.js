import React, { useContext, useEffect } from "react";

import SpeakerDetail from "./SpeakerDetail";
import { SpeakerModalProvider } from "../../contexts/SpeakerModalContext";
import { SpeakersDataContext } from "../../contexts/SpeakersDataContext";
import useSpeakerSortAndFilter from "../../hooks/useSpeakerSortAndFilter";
import SpeakerMenu from "./SpeakerMenu";
import { SpeakerMenuContext } from "../../contexts/SpeakerMenuContext";

const Speakers = () => {
  const { data: speakerList, loadingStatus } = useContext(SpeakersDataContext);
  const { speakingSaturday, speakingSunday, searchText } = useContext(
    SpeakerMenuContext
  );

  useEffect(() => {}, [speakingSaturday, speakingSunday]);

  const speakerListFiltered = useSpeakerSortAndFilter(speakerList);
  if (loadingStatus === "hasErrored") return <div>Errored on load</div>;

  return (
    <>
      <SpeakerMenu />
      <div className="container">
        <div className="row g-4">
          <SpeakerModalProvider>
            {speakerListFiltered.map((speakerRec) => {
              return (
                <SpeakerDetail
                  key={speakerRec.id}
                  speakerRec={speakerRec}
                  showDetails={false}
                />
              );
            })}
          </SpeakerModalProvider>
        </div>
      </div>
    </>
  );
};

export default Speakers;

// // just used to convert base data
// var x = speakerListFiltered.map(function (rec) {
//   return {
//     ...rec,
//     imageUrl: `/images/Speaker-${rec.id}.jpg`,
//     email: rec.firstName + "." + rec.lastName + "@codecamp.net",
//   };
// });
// console.log(x);
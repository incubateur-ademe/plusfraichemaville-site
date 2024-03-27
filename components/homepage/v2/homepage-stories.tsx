import { homepageData } from "./homepage-data";
import { HomepageStoriesControllers } from "./homepage-stories-controllers";
import { HomepageStory } from "./homepage-story";

export const HomepageStories = () => {
  const { stories } = homepageData;
  return (
    <div className="mb-11 pl-6 relative">
      <h3 className="my-14 text-pfmv-navy max-w-2xl text-center mx-auto">{stories.title}</h3>
      <div className="overflow-scroll">
        <div className="flex gap-6" id="homepage-stories-slider">
          {stories.cards.map((story, index) => (
            <HomepageStory slug={story} key={index} />
          ))}
        </div>
      </div>
      <HomepageStoriesControllers totalCards={stories.cards.length} />
    </div>
  );
};

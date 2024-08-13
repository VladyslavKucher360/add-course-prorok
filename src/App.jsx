import { useEffect, useState } from 'react';
import './App.css';

const courseObject = {
  id: 0,
  name: "",
  siteLink: "",
  courseLink: "",
  typeOfContentList: [
    {
      id: 1,
      name: "Video"
    },
    {
      id: 2,
      name: "Article"
    },
    {
      id: 3,
      name: "Interactive"
    },
  ],
  targetGroupList: [
    {
      id: 1,
      name: "Beginners"
    },
    {
      id: 2,
      name: "Intermediates"
    },
    {
      id: 3,
      name: "Advanced"
    }
  ],
  creationDate: "2024-08-11T20:39:59.577Z",
  creatorsContact: "",
  minPrice: 0,
  maxPrice: 0,
  ratingOnGoogle: 0,
  marketingDescription: "",
  forAIDescription: "",
  trainingMode: [
    {
      id: 3,
      name: "ProduktFizyczny"
    },
    {
      id: 2,
      name: "asdasd"
    },
    {
      id: 1,
      name: "gdsasgs"
    },
    {
      id: 4,
      name: "maksmhyb"
    },
  ],
  contentCategory: [
    {
      id: 1,
      name: "Programming"
    },
    {
      id: 2,
      name: "Design"
    },
    {
      id: 3,
      name: "Marketing"
    }
  ],
  benefitsOfCourse: "",
  trainingTopics: "",
  startDate: "2024-08-11T20:39:59.577Z",
  groupSize: [
    {
      id: 1,
      name: "Small"
    },
    {
      id: 2,
      name: "Medium"
    },
    {
      id: 3,
      name: "Large"
    }
  ],
  softSkills: [
    {
      id: 1,
      name: "Communication"
    },
    {
      id: 2,
      name: "Teamwork"
    },
    {
      id: 3,
      name: "Problem Solving"
    }
  ],
  formOfKnowledge: [
    {
      id: 1,
      name: "Lecture"
    },
    {
      id: 2,
      name: "Hands-on"
    },
    {
      id: 3,
      name: "Self-study"
    }
  ],
  becomeAfterTraining: "",
  levelOfAdvancement: [
    {
      id: 1,
      name: "Beginner"
    },
    {
      id: 2,
      name: "Intermediate"
    },
    {
      id: 3,
      name: "Advanced"
    }
  ],
  imageId: 0
};

const categoriesFromApi = {
  contentCategory: {
    Bezpieczenstwo: 1,
    NawykiZywieniowe: 29,
    ZdrowieIFitness: 52,
  },
  formOfKnowledge: {
    MaterialyOnline: 6,
    IndywidualneWsparcie: 4,
    SocialLearningWymianaWiedzyMiedzyUczestnikami: 7,
  },
  groupSize: {
    DlaPar: 1,
    Indywidualne: 3,
    Grupowe: 2,
  },
  levelOfAdvancement: {
    Zaawansowany: 3,
    Podstawowy: 2,
    Ekspercki: 1,
  },
  softSkills: {
    ZarzadzanieCzasem: 33,
    ZwiekczeniePewnosciSiebie: 36,
  },
  targetGroup: {
    OsobyPoszukujaceSpecjalistycznychDiet: 47,
    EntuzjasciMedycynyNaturalnejISuplementacji: 6,
    Mlodziez13_18Lat: 26,
  },
  trainingMode: {
    ProduktFizyczny: 3,
    Stacjonarnie: 4,
    Hybrydowo: 1,
    OnLine: 2,
  },
  typeOfContent: {
    Audyt: 1,
    Ksiazki: 2,
    Podcasty: 3,
  }
};

const App = () => {
  const [course, setCourse] = useState(courseObject);
  const [tokenToAdd, setTokenToAdd] = useState('');
  const [categoryFromApi, setCategoryFromApi] = useState(categoriesFromApi);

  const updateCourseWithApiCategories = () => {
    const mapApiCategories = (apiCategory) => {
      return Object.keys(apiCategory).map((key) => ({
        id: apiCategory[key],
        name: key,
      }));
    };

    setCourse((prevCourse) => ({
      ...prevCourse,
      contentCategory: mapApiCategories(categoryFromApi.contentCategory),
      formOfKnowledge: mapApiCategories(categoryFromApi.formOfKnowledge),
      groupSize: mapApiCategories(categoryFromApi.groupSize),
      levelOfAdvancement: mapApiCategories(categoryFromApi.levelOfAdvancement),
      softSkills: mapApiCategories(categoryFromApi.softSkills),
      targetGroupList: mapApiCategories(categoryFromApi.targetGroup),
      typeOfContentList: mapApiCategories(categoryFromApi.typeOfContent),
      trainingMode: mapApiCategories(categoryFromApi.trainingMode),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value
    });
  };

  const handleChangeToken = (e) => {
    setTokenToAdd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
  };

  const handleCheckboxChange = (e, key, item) => {
    const { checked } = e.target;
    const updatedList = course[key].map((i) =>
      i.id === item.id ? { ...i, checked: !i.checked } : i
    );

    setCourse({
      ...course,
      [key]: updatedList
    });
  };

  const renderCheckboxList = (key, list) => {
    return list.map((item) => (
      <div key={item.id}>
        <label>
          <input
            type="checkbox"
            checked={!!course[key].find((i) => i.id === item.id)?.checked}
            onChange={(e) => handleCheckboxChange(e, key, item)}
          />
          {item.name}
        </label>
      </div>
    ));
  };

  async function getAllCategories() {
    const url = 'https://api.prorokszkoleniowy.pl/get-all-categories';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${tokenToAdd}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Handle the response data as needed
      setCategoryFromApi(data);
      updateCourseWithApiCategories();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className='w-[1000px] mx-auto my-12'>
      <h1 className='text-4xl mb-4'>Add course form</h1>
      <div className='bg-lightBeige p-2 w-max flex gap-4 mb-6 border rounded border-maroon max-w-[1000px]'>
        <label>Token</label>
        <textarea value={tokenToAdd} onChange={handleChangeToken} type="text" className='w-[900px]' rows={5} />
      </div>
      <button onClick={() => getAllCategories()}>Click</button>
      <form onSubmit={handleSubmit}>
        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Name</label>
          <input type="text" name="name" value={course.name} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Site Link</label>
          <input type="text" name="siteLink" value={course.siteLink} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Course Link</label>
          <input type="text" name="courseLink" value={course.courseLink} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Type of Content</label>
          {renderCheckboxList('typeOfContentList', course.trainingMode)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Target Group</label>
          {renderCheckboxList('targetGroupList', course.targetGroupList)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Creation Date</label>
          <input type="datetime-local" name="creationDate" value={course.creationDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Creator's Contact</label>
          <input type="text" name="creatorsContact" value={course.creatorsContact} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Min Price</label>
          <input type="number" name="minPrice" value={course.minPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Max Price</label>
          <input type="number" name="maxPrice" value={course.maxPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Rating on Google</label>
          <input type="number" name="ratingOnGoogle" value={course.ratingOnGoogle} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Marketing Description</label>
          <textarea name="marketingDescription" value={course.marketingDescription} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>For AI Description</label>
          <textarea name="forAIDescription" value={course.forAIDescription} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Training Mode</label>
          {renderCheckboxList('trainingMode', course.trainingMode)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Content Category</label>
          {renderCheckboxList('contentCategory', course.contentCategory)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Benefits of Course</label>
          <textarea name="benefitsOfCourse" value={course.benefitsOfCourse} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Training Topics</label>
          <textarea name="trainingTopics" value={course.trainingTopics} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Start Date</label>
          <input type="datetime-local" name="startDate" value={course.startDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Group Size</label>
          {renderCheckboxList('groupSize', course.groupSize)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Soft Skills</label>
          {renderCheckboxList('softSkills', course.softSkills)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Form of Knowledge</label>
          {renderCheckboxList('formOfKnowledge', course.formOfKnowledge)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Become After Training</label>
          <textarea name="becomeAfterTraining" value={course.becomeAfterTraining} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Level of Advancement</label>
          {renderCheckboxList('levelOfAdvancement', course.levelOfAdvancement)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border rounded border-maroon flex-wrap max-w-[1000px]'>
          <label>Image ID</label>
          <input type="number" name="imageId" value={course.imageId} onChange={handleChange} />
        </div>

        <button className='bg-maroon py-2 px-4 rounded text-white' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;

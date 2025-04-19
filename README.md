# 🌱 COMP4037-CW2-Visualisation-20702578

This project is a dynamic interactive dashboard for **visualizing the environmental impact of diets across demographic groups**, developed for **COMP4037 Research Methods Coursework 2**. It enables exploration of how **diet type**, **gender**, and **age group** affect sustainability metrics such as:

- Greenhouse Gas Emissions (GHGs)
- Land Use
- Water Scarcity
- Biodiversity Loss
- Eutrophication

## 🚀 Features

- 📊 **Radar Chart**: Compares 5 impact metrics across 6 diets interactively by age and gender.
- 📉 **Bar Chart**: Displays diet-wise GHGs, broken down by gender and age group.
- 📦 **Box Plot**: Shows variability and outliers of impact values for each diet/gender. You can find it under the Supplementary Charts folder as it is a static visualisation. 

Check out the Box Plot Code:  
👉 [Box Plot Code](https://colab.research.google.com/drive/1eTBf1l60Fcc_SnPSDr_WF9CgAFAYo5Xw?usp=sharing)

- 🧭 Responsive UI powered by **Next.js** and **Plotly.js**.

## 🔗 Live Dashboard

Hosted on **Vercel**:  
👉 [comp-4037-cw-2-visualisation-20702578.vercel.app](https://comp-4037-cw-2-visualisation-20702578.vercel.app)

## 🧪 Dataset

The primary dataset is `Results_21Mar2022.csv`, obtained from (https://ora.ox.ac.uk/objects/uuid:ca441840-db5a-48c8-9b82-1ec1d77c2e9c) for the CW2 coursework. 

## 🗺️ Digital Map (Attempt) 

The primary dataset doesn't have any location/regional based data. Thus making it not so straightforward for creating a digital map.

However, in the provided [article](https://www.nature.com/articles/s43016-023-00795-w#Bib1) it is mentioned that the study linked diet records from the EPIC-Oxford cohort of 55,504 participants with environmental impact data drawn from the Poore and Nemecek LCA database to quantify the sustainability of different diets​.

So in order to attempt in creating a digital map, I searched and used the supplementary values (e.g. water scarcity per country) from the **JP LCA dataset** used in the [Poore and Nemecek (2018) study](https://www.science.org/doi/10.1126/science.aaq0216). 

Check my code for digital maps
👉 [Digital Map Code and Image](https://colab.research.google.com/drive/1R3CvlKwp_l4_HgQWK3KOu_hz0cHZ40jW?usp=sharing)

✍️ **Author**  
Akshita Sushil Bhatia  

**Student ID:** 20702578  
**Module:** COMP4037 – Research Methods
**University:** University of Nottingham UK

📄 **License**  
This project is for academic submission only and is not licensed for commercial use or plagirism.
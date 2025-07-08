# 🛒 Amazon-Style Filter Dashboard

An interactive, performant frontend application for dynamically filtering CSV datasets — inspired by Amazon’s faceted search UI.

**Built as part of a frontend assignment for Loop.**  
I designed this project to demonstrate real-world filtering logic, efficient data handling, and component-based UI development using React + TypeScript.

---

## 🚀 Live Demo
> 📎 Replace this link after deploying  
https://amazon-style-filter-dashboard.vercel.app/

---

## 📂 Features

✅ Upload any `.csv` file  
✅ Automatically generate filters for all columns  
✅ Amazon-style multi-select filters (dropdowns)  
✅ Filters update options based on other selections  
✅ Displays filtered table with up to 100 results  
✅ Scrollable table with sticky headers  
✅ Optimized with `useMemo` and `useEffect` for speed  
✅ TypeScript-safe & production ready  

---

## 📊 Dataset Example

Given this CSV:

```csv
number,mod3,mod4,mod5,mod6
1,1,1,1,1
2,2,2,2,2
3,0,3,3,3
4,1,0,4,4
5,2,1,0,5
6,0,2,1,0
```
| Test Case | Input                      | Expected Output                    |
| --------- | -------------------------- | ---------------------------------- |
| TC1       | Upload `dataset_small.csv` | Table & filters load               |
| TC2       | Select `mod3 = 0`          | Only rows where `mod3=0` are shown |
| TC3       | Add `mod4 = 1`             | Cross-section of filters shown     |
| TC4       | Conflicting filters        | 0 rows shown                       |
| TC5       | Upload `dataset_large.csv` | App stays responsive               |

```frontend-filter-dashboard/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── custom.d.ts
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```
# 📦 Setup Instructions
```
git clone https://github.com/yourname/Amazon-Style-Filter-Dashboard.git
cd Amazon-Style-Filter-Dashboard
npm install
npm run dev
```

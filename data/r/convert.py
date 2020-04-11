import pandas as pd


college_qualities = pd.read_excel("college_qualities.xlsx", sheet_name=None)
college_qualities = list(college_qualities.values())[0]
college_qualities.to_csv("college_qualities.csv", encoding='utf_8_sig')

equiv_scores = pd.read_excel("equiv_scores.xlsx", sheet_name=None)
equiv_scores = list(equiv_scores.values())[0]
equiv_scores.to_csv("equiv_scores.csv", encoding='utf_8_sig')

college_admissions_simin = pd.read_excel("college_admissions_simin.xlsx", sheet_name=None)
college_admissions_simin = list(college_admissions_simin.values())[0]
college_admissions_simin = college_admissions_simin.drop(columns=['campus'])
college_admissions_simin.to_csv("college_admins.csv", encoding='utf_8_sig')
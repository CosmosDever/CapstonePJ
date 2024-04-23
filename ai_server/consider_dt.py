# def find_lowest_value(conditions):
#     # แยกค่าเงื่อนไข
#     criteria = {}
#     for condition in conditions:
#         # แยก condition ตาม '<='
#         indicator, value = condition.split(' <= ')
#         criteria[indicator] = float(value)
    
#     # หา indicator ที่มีค่าเกณฑ์น้อยที่สุด
#     lowest_value_indicator = None
#     lowest_value = float('inf')
    
#     # ตรวจสอบค่าเงื่อนไขและหาค่าน้อยที่สุด
#     for indicator, value in criteria.items():
#         # เปรียบเทียบค่าและบันทึกค่าเกณฑ์น้อยที่สุด
#         if value < lowest_value:
#             lowest_value = value
#             lowest_value_indicator = indicator
                
#     return lowest_value_indicator, lowest_value

# # เงื่อนไขที่ได้รับ
# conditions = ['RSI <= 36.88', 'ATR <= 55753.648', 'ADX <= 26.937']

# indicator, value = find_lowest_value(conditions)

# if indicator is not None:
#     print(f"ตัวบ่งชี้ที่มีค่าน้อยที่สุดคือ {indicator} ด้วยค่า {value:.2f}")
# else:
#     print("ไม่มีตัวบ่งชี้ใดที่น้อยกว่าหรือเท่ากับค่าเกณฑ์")

# เงื่อนไขที่ได้รับ
conditions = ['RSI <= 36.88', 'ATR <= 55753.648', 'ADX <= 26.937']

# แยกค่าเงื่อนไขออกเป็นพจนานุกรม
criteria = {}
for condition in conditions:
    # แยก condition ตาม '<='
    indicator, value = condition.split(' <= ')
    criteria[indicator] = float(value)

# หา indicator ที่มีค่าเกณฑ์น้อยที่สุด
lowest_value_indicator = None
lowest_value = float('inf')

# ตรวจสอบค่าเงื่อนไขและหาค่าน้อยที่สุด
for indicator, value in criteria.items():
    # เปรียบเทียบค่าและบันทึกค่าเกณฑ์น้อยที่สุด
    if value < lowest_value:
        lowest_value = value
        lowest_value_indicator = indicator

# กำหนด filtered_conditions ตามค่าเกณฑ์น้อยที่สุดที่พบ
filtered_conditions = [f"{lowest_value_indicator} <= {lowest_value:.2f}"]

# แสดงผลตัวบ่งชี้และค่าเกณฑ์น้อยที่สุด
print(f"ตัวบ่งชี้ที่มีค่าน้อยที่สุดคือ {lowest_value_indicator} ด้วยค่า {lowest_value:.2f}")
print("filtered_conditions:", filtered_conditions)

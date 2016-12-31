import moment
from datetime import datetime

print(moment.now().format("M-D-YYYY"))
print(moment.now().subtract(days=1).format("M-D-YYYY"))
print(moment.now().format("YYYY"))

stores = {
    "e4015fdf574e43409f93cf731d545b3a": {
        "id": "e4015fdf574e43409f93cf731d545b3a",
        "location": "Baku",
        "name": "Store A"
    }
}


items = [
    {
        "id": "b49aac14297040238b510f86ffddc23c",
        "name": "Item 2",
        "price": 33.99,
        "store_id": "e4015fdf574e43409f93cf731d545b3a"
    },
    {
        "id": "b49aac14297040238b510f86ffddc23c",
        "name": "Item 2",
        "price": 33.99,
        "store_id": "e4015fdf574e43409f93cf731d545b3a"
    }
]

store_item_counts = {}

for store_id in stores:
    count = 0
    for item in items:
        if item["store_id"] == store_id:
            count += 1
    store_item_counts[store_id] = count

print(store_item_counts)

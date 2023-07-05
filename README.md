# Batch Packing Assignment (2019)

![demo](/img/Batch_Assignment_Port.png)

## Requirement

```bash
- Create an interface within NetSuite where a user can assign sales order into batches for picking.
- Only employees assigned as pickers are allowed to be identified on Sales Order as Pickers.
- Create a Suitelet Form that allows for filtering of sales orders
(criteria and filters to be determined).
- Upon filtering and providing a result list, user can select all or individual sales orders
to be assigned to a batch.
- The batch must be unique (could be based on date and time) and can only be assigned
to one picker employee.
- When a batch is assigned, script will loop through all selected results and set 'Picker'
to the selected employees as well as the Batch Number on the sales order to the one specified above.

External:
- RF-Smart will allow filtering of 'Batch IDs' on their devices which will filter out batches
to specific employees.
- Pickers will use RF-Smart to automatically create the Item Fulfillments in 'Packed' status
for these Sales Orders.
- ShipWorks will create / print Shipping Labels and Packing Slips.
- Employees will Pack / Ship Items and mark them as Shipped in RF-Smart.
- Script version should be 2.0.
```

## Running Results

![demo](/img/Batch_Assignment_1.jpg)

![demo](/img/Batch_Assignment_2.jpg)

![demo](/img/Batch_Assignment_3.jpg)

![demo](/img/Batch_Assignment_4.jpg)

![demo](/img/Batch_Assignment_5.jpg)

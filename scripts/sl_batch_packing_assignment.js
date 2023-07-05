{
  //A Suitelet form is created to allow assignment of Sales Orders into Batches for Picking.
  //Only employees assigned as Pickers are allowed to be identified as Pickers (id: custentity_rfs_picker)
  //Filters are:
  //Class - done
  //Department - done
  //Subsidiary - done
  //Single or Multiple Line Orders
  //SFP - Seller Fulfilled Prime (id: custbody_is_mfn_prime)
  //Shipping Speed - requested shipping service level
  //Is Same Item - Group orders by items on the order (single line items) - done
  //Price Range (Min & Max)
  //Date Range (Start and End)
  //User to Submit form after Filters are set and will allow 'Batch' to be updated.
  //User can 'Mark All', 'Unmark All' or select individual orders to batch
  //Batch is unique and can only be assigned to one Picker

  /**
   *@NApiVersion 2.x
   *@NScriptType Suitelet
   */
  define([
    "N/ui/serverWidget",
    "N/search",
    "N/log",
    "N/https",
    "N/record",
    "N/file",
  ], function (serverWidget, search, log, https, record, file) {
    function onRequest(context) {
      if (context.request.method === "GET") {
        var form = serverWidget.createForm({
          title: "Batch Assignment For Sales Orders",
        });

        //Class Filter
        var orderClass = form.addField({
          id: "class",
          type: serverWidget.FieldType.SELECT,
          label: "Class",
          source: "classification",
        });
        //Department Filter
        var orderDepartment = form.addField({
          id: "department",
          type: serverWidget.FieldType.SELECT,
          label: "Department",
          source: "department",
        });
        //Subsidiary Filter
        var orderSubsidiary = form.addField({
          id: "subsidiary",
          type: serverWidget.FieldType.SELECT,
          label: "Subsidiary",
          source: "subsidiary",
        });
        // Seller Fulfilled Prime Filter
        var orderSellerPrime = form.addField({
          id: "custpage_sellerfulfilledprime",
          type: serverWidget.FieldType.CHECKBOX,
          label: "Seller Fulfilled Prime",
        });
        //  Shipping Speed Filter
        var orderShippingSpeed = form.addField({
          id: "custpage_shippingspeed",
          type: serverWidget.FieldType.SELECT,
          label: "Shipping Speed",
          source: "customlist_cps_amz_fba_speed",
        });
        //  Item Filter
        var orderItem = form.addField({
          id: "item",
          type: serverWidget.FieldType.SELECT,
          label: "Item",
          source: "item",
        });
        //Date Start
        var orderDateStart = form.addField({
          id: "custpage_date_start",
          type: serverWidget.FieldType.DATE,
          label: "Date Start",
        });
        //Date End
        var orderDateEnd = form.addField({
          id: "custpage_date_end",
          type: serverWidget.FieldType.DATE,
          label: "Date End",
        });
        //Price Start
        var orderPriceStart = form.addField({
          id: "custpage_price_start",
          type: serverWidget.FieldType.FLOAT,
          label: "Price Start",
        });
        //Price End
        var orderPriceEnd = form.addField({
          id: "custpage_price_end",
          type: serverWidget.FieldType.FLOAT,
          label: "Price End",
        });
        //Add RF Picker
        var rfPicker = form.addField({
          id: "custpage_rf_picker_list",
          type: serverWidget.FieldType.SELECT,
          label: "RF Picker",
          source: "employee",
        });

        var sublist = form.addSublist({
          id: "sublist",
          type: serverWidget.SublistType.LIST,
          label: "Open Sales Orders",
        });

        //Get List of Open Sales Orders
        var openSalesOrdersList = search.load({
          id: "customsearch_blutek_open_so_suitelet",
        });
        var openSalesOrdersResults = openSalesOrdersList.run();

        var firstResult = openSalesOrdersList.run().getRange({
          start: 0,
          end: 1,
        })[0];

        log.debug({
          details:
            "There are " +
            firstResult.columns.length +
            " columns in the result:",
        });

        log.debug({
          title: "openSalesOrdersList",
          details: JSON.stringify(firstResult.columns),
        });

        // Create an array to store the transactions from the search results
        var openSalesOrdersArray = new Array();

        if (openSalesOrdersResults) {
          //Add update checkbox
          sublist.addField({
            id: "updatebatchbox",
            type: serverWidget.FieldType.CHECKBOX,
            label: "Update",
          });

          // Add the search columns to the sublist
          for (var i = 0; i < firstResult.columns.length; i++) {
            log.debug({
              details: firstResult.columns[i].name,
            });

            var listcolumn = sublist.addField({
              id: firstResult.columns[i].name,
              type: serverWidget.FieldType.TEXT,
              label: firstResult.columns[i].label,
            });
          }

          log.debug({
            title: "openSalesOrdersResults",
            details: JSON.stringify(openSalesOrdersResults),
          });

          // Add Search results to each column
          var k = 0; //count of results
          openSalesOrdersResults.each(function (result) {
            for (var j = 0; j < firstResult.columns.length; j++) {
              var fieldId = firstResult.columns[j].name;
              // log.debug({
              //   details: fieldId + ' ' +result.getValue(fieldId)
              // });
              sublist.setSublistValue({
                id: fieldId,
                line: k,
                value: result.getValue(fieldId),
              });
            }
            k++;
            return true;
          });

          sublist.addRefreshButton();
          sublist.addMarkAllButtons();
        }
        form.addButton({
          id: "custpage_search_filters",
          label: "Search",
          functionName: enterPicker(),
        });
        form.addSubmitButton("Update Pickers");

        context.response.writePage(form);
      } else if (context.request.method === "POST") {
        context.response.write("Selected Text Values are");
        //Get total Line count
        var delimiter = /\u0001/;
        var sublistData =
          context.request.parameters.sublistdata.split(delimiter);
        var sublistField1 = sublistData[0];
        var sublistField2 = sublistData[1];

        context.response.write("sublistcount: " + sublistData);
        log.debug({
          title: "context.request.parameters",
          details: context.request.parameters,
        });
      }
    }

    return {
      onRequest: onRequest,
    };
  });
}

function enterPicker() {
  log.debug({
    title: "enterPicker",
    details: "enterPicker",
  });
}

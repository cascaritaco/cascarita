// ** DEPRECATED **

// const ResponseId = require("../mongoModels/response_id");

// parseResponseJSON will take in the raw responses json and break it into individual responses:
function parseResponseJSON(jsonStr, uniqueResponseIds, formId) {
  // we'll add individual responses to this array:
  var responses = [];
  var emptyMap = false;

  var obj = JSON.parse(jsonStr);

  if (uniqueResponseIds.size == 0) {
    emptyMap = true;
  }
  // items is a list of responses. Each response has an aswers[] and a response_id
  var items = obj.items;

  // iterate through individual responses:
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.response_type != "completed") {
      continue;
    }

    var response_id = item.response_id;
    var submitted_at = item.submitted_at;
    var answers = item.answers;

    // If the response_id is already in our map then it means we have already
    // processed it in the past. We will not process it again.
    if (uniqueResponseIds.has(response_id)) {
      continue;
    }

    // Create individual response object and push to our responses array:
    var response = newResponse(response_id, submitted_at, answers);
    responses.push(response);

    // maybe can set the value to the submitted date. If respnse can be updated
    // by submitter then this can be used as indication to update the response.
    uniqueResponseIds.set(response_id, true);
  }

  // Call function to store/update unique response ids collection with any new ones
  // we have found:
  storeUniqueResponseIds(uniqueResponseIds, formId, emptyMap);

  return responses;
}

// function to load collection into map:
function loadMapWithDocument(responseIdDoc) {
  // Create an empty map to store the key-value pairs
  var map = new Map();

  if (!responseIdDoc) {
    return map;
  }
  // Parse the JSON string into a JavaScript object
  var prevResponseIds = responseIdDoc.unique_ids;

  // Iterate over the properties of the object
  for (var key in prevResponseIds) {
    if (prevResponseIds.hasOwnProperty(key)) {
      // Add each key-value pair to the map
      map.set(key, prevResponseIds[key]);
    }
  }

  // Return the populated map
  return map;
}

function newResponse(response_id, submitted_at, answers) {
  var response = {
    response_id: response_id,
    submitted_at: submitted_at,
    answers: answers,
  };

  return response;
}

async function storeUniqueResponseIds(uniqueResponseIds, form_id, emptyMap) {
  var new_responses = uniqueResponseIds.size != 0;

  const response_id = new ResponseId({
    form_id: form_id,
    unique_ids: uniqueResponseIds,
  });

  const responseIdEntry = await ResponseId.findOne({
    form_id: form_id,
  });

  if (emptyMap && !new_responses) {
    return;
  } else if (emptyMap && new_responses) {
    const responseResult = await response_id.save();
  } else {
    const responseResult = await ResponseId.updateOne(
      { _id: responseIdEntry._id },
      {
        $set: { unique_ids: uniqueResponseIds },
      },
    );
  }
}

module.exports = {
  parseResponseJSON,
  loadMapWithDocument,
  storeUniqueResponseIds,
};

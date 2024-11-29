# API Endpoints

## /api/events
Displays a list of all events that have been created.

### Example

"events": [
    {
    "name": {
    "text": "Dance Party",
    "html": "Dance Party"
    },
    "description": {
    "text": null,
    "html": null
    },
    "url": "https://www.eventbrite.co.uk/e/dance-party-tickets-1063434644649",
    "start": {
    "timezone": "Europe/London",
    "local": "2024-11-19T20:59:00",
    "utc": "2024-11-19T20:59:00Z"
    },
    "end": {
    "timezone": "Europe/London",
    "local": "2024-11-19T23:29:00",
    "utc": "2024-11-19T23:29:00Z"
    },
    "organization_id": "2398883364363",
    "created": "2024-10-28T19:17:08Z",
    "changed": "2024-10-28T19:17:08Z",
    "capacity": 0,
    "capacity_is_custom": false,
    "status": "draft",
    "currency": "GBP",
    "listed": true,
    "shareable": false,
    "invite_only": false,
    "online_event": false,
    "show_remaining": false,
    "tx_time_limit": 1200,
    "hide_start_date": false,
    "hide_end_date": false,
    "locale": "en_US",
    "is_locked": false,
    "privacy_setting": "unlocked",
    "is_series": false,
    "is_series_parent": false,
    "inventory_type": "limited",
    "is_reserved_seating": false,
    "show_pick_a_seat": false,
    "show_seatmap_thumbnail": false,
    "show_colors_in_seatmap_thumbnail": false,
    "source": "api",
    "is_free": true,
    "version": null,
    "summary": null,
    "facebook_event_id": null,
    "logo_id": null,
    "organizer_id": "96474667273",
    "venue_id": null,
    "category_id": null,
    "subcategory_id": null,
    "format_id": null,
    "id": "1063434644649",
    "resource_uri": "https://www.eventbriteapi.com/v3/events/1063434644649/",
    "is_externally_ticketed": false,
    "logo": null
    }
]


## /api/create-events
Used for posting an event to the eventbrite API.

## /api/events/:id
Displays the information of a specific event using its unique ID number.

### Example
{
"name": {
"text": "Band Camp",
"html": "Band Camp"
},
"description": {
"text": null,
"html": null
},
"url": "https://www.eventbrite.co.uk/e/band-camp-tickets-1078614447849",
"start": {
"timezone": "Europe/London",
"local": "2025-08-14T10:00:00",
"utc": "2025-08-14T09:00:00Z"
},
"end": {
"timezone": "Europe/London",
"local": "2025-08-16T18:00:00",
"utc": "2025-08-16T17:00:00Z"
},
"organization_id": "2398883364363",
"created": "2024-11-10T13:23:53Z",
"changed": "2024-11-10T13:23:53Z",
"capacity": 0,
"capacity_is_custom": false,
"status": "draft",
"currency": "GBP",
"listed": true,
"shareable": false,
"invite_only": false,
"online_event": false,
"show_remaining": false,
"tx_time_limit": 1200,
"hide_start_date": false,
"hide_end_date": false,
"locale": "en_US",
"is_locked": false,
"privacy_setting": "unlocked",
"is_series": false,
"is_series_parent": false,
"inventory_type": "limited",
"is_reserved_seating": false,
"show_pick_a_seat": false,
"show_seatmap_thumbnail": false,
"show_colors_in_seatmap_thumbnail": false,
"source": "api",
"is_free": true,
"version": null,
"summary": null,
"facebook_event_id": null,
"logo_id": null,
"organizer_id": "96474667273",
"venue_id": null,
"category_id": null,
"subcategory_id": null,
"format_id": null,
"id": "1078614447849",
"resource_uri": "https://www.eventbriteapi.com/v3/events/1078614447849/",
"is_externally_ticketed": false,
"logo": null
}
-- Section 1: Basic Queries (8 pts)

-- 1. Return all active users who signed up before Jan 1, 2024.

```sql
SELECT *
FROM users
WHERE signup_date < '2024-01-01';
```

-- 2. List distinct cities from which users signed up using a free trial.
-- Hint: Filter subscriptions.subscription_type = 'trial' and select
-- distinct users.city.

```sql
SELECT DISTINCT u.city
FROM users u
JOIN subscriptions s ON u.user_id = s.user_id
WHERE s.subscription_type = 'trial'
```

-- 3. Find all users who signed up in the same month as the campaign named 'Summer Sale'.
-- Hint: Use a subquery to get the start_date of 'Summer Sale' and
-- compare DATE_TRUNC('month', signup_date).

```sql
SELECT *
FROM users
WHERE DATE_TRUNC('month', signup_date) = (
   SELECT DATE_TRUNC('month', start_date)
   FROM campaigns
   WHERE campaign_name = 'Summer Sale'
);
```


-- 4. Retrieve the top 10 most recently signed-up users.

```sql
SELECT *
FROM users
ORDER BY signup_date DESC
LIMIT 10;
```

-- Section 2: JOINs and Filters (8 pts)

-- 5. Join users and notifications to find all users who received a push notification in March 2024.
-- Hint: Join users, notifications, and campaigns; filter by
-- campaign_type = 'push' and March 2024.

```sql
SELECT DISTINCT u.*
FROM users u
JOIN notifications n ON u.user_id = n.user_id
JOIN campaigns c ON n.campaign_id = c.campaign_id
WHERE c.campaign_type = 'push'
 AND DATE_TRUNC('month', n.sent_at) = '2024-03-01';
```


-- 6. Which users received more than one campaign in April 2024?
-- Hint: Join users, notifications, and campaigns.

```
SELECT u.*, COUNT(DISTINCT c.campaign_id) as campaign_count
FROM users u
JOIN notifications n ON u.user_id = n.user_id
JOIN campaigns c ON n.campaign_id = c.campaign_id
WHERE DATE_TRUNC('month', n.sent_at) = '2024-04-01'
GROUP BY u.user_id, u.email, u.signup_date, u.city
HAVING COUNT(DISTINCT c.campaign_id) > 1;
```

-- 7. Join users, notifications, and campaigns to find users who received both an email and a push campaign.
-- Hint: Use conditional aggregation or self-join grouped by user ID to
-- check for both campaign types.

```sql
SELECT u.*
FROM users u
JOIN notifications n ON u.user_id = n.user_id
JOIN campaigns c ON n.campaign_id = c.campaign_id
GROUP BY u.user_id, u.email, u.signup_date, u.city
HAVING COUNT(DISTINCT CASE WHEN c.campaign_type = 'email' THEN c.campaign_id END) > 0
  AND COUNT(DISTINCT CASE WHEN c.campaign_type = 'push' THEN c.campaign_id END) > 0;
```


-- 8. Find all users who were notified but never opened any notification.
-- Hint: Filter notifications.opened_at IS NULL and join to users for
-- user details.

```sql
SELECT DISTINCT u.*
FROM users u
JOIN notifications n ON u.user_id = n.user_id
WHERE u.user_id NOT IN (
   SELECT user_id 
   FROM notifications 
   WHERE opened_at IS NOT NULL
);

```



-- Section 3: Aggregation (7 pts)

-- 9. Count the number of users per campaign who opened their notification.
-- Hint: Use notifications table, filter opened_at IS NOT NULL.

```sql
SELECT 
   c.campaign_id,
   c.campaign_name,
   COUNT(DISTINCT n.user_id) as users_who_opened
FROM campaigns c
JOIN notifications n ON c.campaign_id = n.campaign_id
WHERE n.opened_at IS NOT NULL
GROUP BY c.campaign_id, c.campaign_name
ORDER BY c.campaign_id;
```


-- 10. What is the average number of notifications per user?

```sql
SELECT 
    COUNT(n.notification_id)::FLOAT / COUNT(DISTINCT u.user_id) as avg_notifications_per_user
FROM users u
JOIN notifications n ON u.user_id = n.user_id;
```

-- 11. Calculate the percentage of users who opened at least one notification.
-- Hint: Use conditional aggregation or two counts: total users vs. users
-- with at least one opened_at.


```sql
SELECT 
   COUNT(DISTINCT CASE WHEN n.opened_at IS NOT NULL THEN u.user_id END) * 100.0 / 
   COUNT(DISTINCT u.user_id) as percentage_opened
FROM users u
LEFT JOIN notifications n ON u.user_id = n.user_id;
```

-- 12. Count the number of cities with more than 50 active users.
-- Hint: Join users and subscriptions.

```sql
-- 12. Count the number of cities with more than 50 active users.
SELECT COUNT(*) as cities_with_over_50_active
FROM (
   SELECT u.city, COUNT(DISTINCT u.user_id) as active_user_count
   FROM users u
   JOIN subscriptions s ON u.user_id = s.user_id
   WHERE s.status = 'active'
   GROUP BY u.city
   HAVING COUNT(DISTINCT u.user_id) > 50
) city_counts;
```



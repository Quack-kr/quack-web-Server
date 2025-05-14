CREATE TABLE customer_user (
    customer_user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider VARCHAR(20),
    provider_id VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    nickname VARCHAR(255) UNIQUE,
    created_at DATETIME,
    deleted_at DATETIME,
    is_delete BOOLEAN
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE customer_user_metadata (
    customer_user_metadata_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_user_id BIGINT,
    profile_photo_id BIGINT,
    terms_agreed BOOLEAN NOT NULL,
    privacy_agreed BOOLEAN NOT NULL,
    location_terms_agreed BOOLEAN NOT NULL,
    marketing_opt_in BOOLEAN,
    decibel INT,
    FOREIGN KEY (customer_user_id) REFERENCES customer_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE business_user (
    business_user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    provider_name VARCHAR(100),
    provider_id VARCHAR(255),
    create_time DATETIME,
    deleted_time DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE business_user_apply (
    business_user_apply_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_user_id BIGINT,
    registration_number VARCHAR(50),
    owner_name VARCHAR(100),
    phone_number VARCHAR(50),
    store_name VARCHAR(100),
    business_license_url VARCHAR(500),
    status ENUM('BEGIN', 'DONE', 'REJECTED'),
    create_time DATETIME,
    update_time DATETIME,
    privacy_agreed_at DATETIME,
    comment TEXT,
    FOREIGN KEY (business_user_id) REFERENCES business_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE business_user_metadata (
    business_user_metadata_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_number VARCHAR(50),
    owner_name VARCHAR(100),
    phone_number VARCHAR(50),
    store_name VARCHAR(100),
    business_license_url VARCHAR(500),
    status ENUM('BEGIN', 'DONE', 'REJECTED'),
    create_time DATETIME,
    update_time DATETIME,
    privacy_agreed_at DATETIME,
    comment TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant (
    restaurant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(255),
    address VARCHAR(255),
    location POINT NOT NULL,
    SPATIAL INDEX(location)
    area_id BIGINT,
    category_id BIGINT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_metadata (
    restaurant_metadata_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    average_price INT,
    parking VARCHAR(50),
    is_uni_sex_toilet BOOLEAN,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_owner_metadata (
    restaurant_owner_metadata_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    simple_description VARCHAR(255),
    detail_description TEXT,
    effort_message VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_hours (
    restaurant_hours_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    day_of_week VARCHAR(10),
    open_time TIME,
    last_order_time TIME,
    close_time TIME,
    is_closed BOOLEAN,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_breaks (
    restaurant_breaks_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    day_of_week VARCHAR(10),
    break_start TIME,
    break_end TIME,
    last_order_time TIME,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_category (
    restaurant_category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_category_code VARCHAR(100),
    restaurant_id BIGINT,
    create_date DATETIME,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_area (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    area_name VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE customer_saved_restaurant (
    restaurant_id BIGINT,
    customer_id BIGINT,
    is_saved BOOLEAN,
    PRIMARY KEY (restaurant_id, customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE restaurant_keyword (
    review_keyword_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_tag VARCHAR(100),
    keyword_type ENUM('POSITIVE', 'NEGATIVE')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE menu (
    menu_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    category_id BIGINT,
    name VARCHAR(100),
    price INT,
    description TEXT,
    sort_order INT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (category_id) REFERENCES menu_category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE menu_category (
    menu_category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    sort_order INT,
    category_name VARCHAR(100),
    created_at DATETIME,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE menu_eval (
    menu_eval_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT,
    menu_id BIGINT,
    keyword_id BIGINT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE photo (
    photo_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500),
    target_type VARCHAR(50),
    target_id BIGINT,
    photo_type VARCHAR(50),
    sort_order INT,
    created_at DATETIME,
    deleted_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE review (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL,
    content TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE review_like (
    review_like_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT,
    customer_id BIGINT,
    review_like_type VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE review_restaurant_mapping (
    review_restaurant_mapping_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT,
    keyword_id BIGINT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE review_summary (
    review_summary_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT,
    history_date DATE,
    keyword_type ENUM('POSITIVE', 'NEGATIVE'),
    review_summary_rank INT,
    total_count INT,
    review_summary_tag VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE review_menu_summary (
    review_menu_summary_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    menu_id BIGINT,
    history_date DATE,
    total_count INT,
    rank INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ad_payment_types (
    ad_payment_types_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    name VARCHAR(255),
    keyworkd VARCHAR(255) UNIQUE,
    display_order INT,
    is_sold_out BOOLEAN,
    price VARCHAR(100),
    discount_rate VARCHAR(100),
    description_off JSON,
    description_on JSON,
    top_text VARCHAR(255),
    bottom_text VARCHAR(255),
    duration_days INT,
    payload_schema JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE auto_payments (
    auto_payments_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payment_log_id BIGINT,
    owner_id BIGINT,
    deleted_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ad_payment_logs (
    ad_payment_logs_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ad_payment_type_id BIGINT,
    paid_at DATETIME,
    period_start DATETIME,
    restaurant_id BIGINT,
    pg_provider VARCHAR(255),
    pg_data JSON,
    pg_id VARCHAR(255),
    is_auto BOOLEAN,
    auto_payment_id BIGINT,
    period_end DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ad_contents (
    ad_contents_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ad_payment_type_id BIGINT,
    period_start DATETIME,
    restaurant_id BIGINT,
    ad_title_1 VARCHAR(255),
    ad_title_2 VARCHAR(255),
    user_description TEXT,
    menu_json JSON,
    region_id JSON,
    region_name JSON,
    period_end DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
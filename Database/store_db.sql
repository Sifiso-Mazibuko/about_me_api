CREATE TABLE ProductCategory (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL,
    CategoryDescription TEXT
);

CREATE TABLE Vendor (
    VendorID INT AUTO_INCREMENT PRIMARY KEY,
    VendorName VARCHAR(150) NOT NULL,
    ContactName VARCHAR(150),
    Phone VARCHAR(50),
    Email VARCHAR(150),
    Address TEXT
);

CREATE TABLE Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(150) NOT NULL,
    VendorID INT NOT NULL,
    CategoryID INT NOT NULL,
    UnitPrice DECIMAL(10,2),
    QuantityInStock INT DEFAULT 0,
    CONSTRAINT fk_product_vendor FOREIGN KEY (VendorID)
        REFERENCES Vendor (VendorID)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_product_category FOREIGN KEY (CategoryID)
        REFERENCES ProductCategory (CategoryID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_product FOREIGN KEY (ProductID)
        REFERENCES Product (ProductID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

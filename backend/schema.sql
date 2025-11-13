-- Create database and exhibits table + sample data
CREATE DATABASE IF NOT EXISTS museum;
USE museum;

DROP TABLE IF EXISTS exhibits;
CREATE TABLE exhibits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exhibit_title VARCHAR(150) NOT NULL,
  description TEXT,
  origin VARCHAR(100),
  era VARCHAR(60),
  year_discovered INT,
  on_display BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert 10 sample records
INSERT INTO exhibits (exhibit_title, description, origin, era, year_discovered, on_display)
VALUES
('Ancient Drum', 'Large ceremonial drum with carved motifs', 'West Africa', 'Pre-Colonial', 1923, TRUE),
('Traditional Mask', 'Painted mask used in harvest ceremonies', 'Central Africa', '19th century', 1950, TRUE),
('Stone Tools', 'Flakes and hand axes from early settlements', 'Southern Africa', 'Paleolithic', 1938, TRUE),
('Beaded Necklace', 'Glass-bead necklace with geometric patterns', 'East Africa', 'Late 1800s', 1965, TRUE),
('Bronze Figurine', 'Small bronze figure with inlaid copper', 'West Africa', 'Medieval', 1899, FALSE),
('Clay Pot', 'Cooking pot with burn marks and painted rim', 'North Africa', 'Classical', 1905, TRUE),
('Textile Fragment', 'Woven cloth fragment, natural dyes', 'Horn of Africa', '18th century', 1978, FALSE),
('Ivory Comb', 'Intricately carved comb made from ivory', 'Central Africa', 'Early 20th century', 1912, TRUE),
('Rock Painting Panel', 'Panel showing human and animal scenes', 'Southern Africa', 'Neolithic', 1931, FALSE),
('Ceremonial Spear', 'Decorated spear used for rites', 'East Africa', '19th century', 1947, TRUE);
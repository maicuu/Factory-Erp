

-- Metais e Estruturas
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Aço Carbono 1020', 300.0, 'kg', 50.0, 12.50);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Chapa de Alumínio 3mm', 40.0, 'm2', 10.0, 85.00);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Perfil de Inox 304', 120.0, 'm', 30.0, 45.00);

-- Plásticos e Acabamentos
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Polímero ABS Branco', 80.0, 'kg', 20.0, 22.00);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Tinta Epóxi Cinza', 45.0, 'L', 15.0, 38.00);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Verniz Industrial Fosco', 10.0, 'L', 5.0, 55.00);

-- Fixação e Componentes
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Parafuso M8 Zincado', 800.0, 'un', 100.0, 0.45);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Rodízio Industrial Giratório', 18.0, 'un', 40.0, 25.00);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Motor Elétrico 1/2 CV', 5.0, 'un', 10.0, 320.00);

-- Elétrica e Eletrônica
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Cabo de Cobre 2.5mm', 150.0, 'm', 50.0, 4.20);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Controlador Lógico (PLC)', 3.0, 'un', 5.0, 1500.00);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Botão de Emergência Cogumelo', 10.0, 'un', 10.0, 65.00);

-- Embalagem
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Caixa de Papelão G', 50.0, 'un', 25.0, 8.50);
INSERT INTO RawMaterial (name, stockQuantity, unit, minStock, unit_price) VALUES ('Plástico Bolha', 200.0, 'm', 50.0, 1.20);


INSERT INTO Product (name, stockQuantity, price) VALUES ('Banqueta de Aço Simples', 20, 120.00);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Cadeira Industrial Ergônomica', 5, 289.90);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Armário de Aço Oficina', 2, 1200.00);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Ventilador de Chão Industrial', 0, 450.00);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Exaustor de Gases Tóxicos', 0, 1850.00);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Painel de Automação Avançado', 0, 4500.00);
INSERT INTO Product (name, stockQuantity, price) VALUES ('Suporte de Parede Universal', 50, 45.00);


-- 1. Banqueta de Aço Simples
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Banqueta de Aço Simples'), (SELECT id FROM RawMaterial WHERE name = 'Aço Carbono 1020'), 2.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Banqueta de Aço Simples'), (SELECT id FROM RawMaterial WHERE name = 'Tinta Epóxi Cinza'), 0.2);

-- 2. Cadeira Industrial
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Cadeira Industrial Ergônomica'), (SELECT id FROM RawMaterial WHERE name = 'Aço Carbono 1020'), 3.5);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Cadeira Industrial Ergônomica'), (SELECT id FROM RawMaterial WHERE name = 'Polímero ABS Branco'), 1.2);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Cadeira Industrial Ergônomica'), (SELECT id FROM RawMaterial WHERE name = 'Parafuso M8 Zincado'), 8.0);

-- 3. Armário de Aço
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Armário de Aço Oficina'), (SELECT id FROM RawMaterial WHERE name = 'Aço Carbono 1020'), 25.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Armário de Aço Oficina'), (SELECT id FROM RawMaterial WHERE name = 'Tinta Epóxi Cinza'), 2.5);

-- 4. Ventilador Industrial
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Ventilador de Chão Industrial'), (SELECT id FROM RawMaterial WHERE name = 'Motor Elétrico 1/2 CV'), 1.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Ventilador de Chão Industrial'), (SELECT id FROM RawMaterial WHERE name = 'Rodízio Industrial Giratório'), 4.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Ventilador de Chão Industrial'), (SELECT id FROM RawMaterial WHERE name = 'Aço Carbono 1020'), 5.0);

-- 5. Exaustor de Gases
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Exaustor de Gases Tóxicos'), (SELECT id FROM RawMaterial WHERE name = 'Motor Elétrico 1/2 CV'), 1.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Exaustor de Gases Tóxicos'), (SELECT id FROM RawMaterial WHERE name = 'Rodízio Industrial Giratório'), 4.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Exaustor de Gases Tóxicos'), (SELECT id FROM RawMaterial WHERE name = 'Chapa de Alumínio 3mm'), 2.0);

-- 6. Painel de Automação
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Painel de Automação Avançado'), (SELECT id FROM RawMaterial WHERE name = 'Controlador Lógico (PLC)'), 1.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Painel de Automação Avançado'), (SELECT id FROM RawMaterial WHERE name = 'Cabo de Cobre 2.5mm'), 50.0);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Painel de Automação Avançado'), (SELECT id FROM RawMaterial WHERE name = 'Botão de Emergência Cogumelo'), 2.0);

-- 7. Suporte de Parede
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Suporte de Parede Universal'), (SELECT id FROM RawMaterial WHERE name = 'Aço Carbono 1020'), 0.5);
INSERT INTO ProductComponent (product_id, material_id, quantity) VALUES 
((SELECT id FROM Product WHERE name = 'Suporte de Parede Universal'), (SELECT id FROM RawMaterial WHERE name = 'Parafuso M8 Zincado'), 4.0);
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { api } from '../utils/api';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { TableModal } from '../components/TableModal';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Category } from '../types/Category';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products'),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId ? '/products' : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);

    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItem = [...prevState];
      const item = newCartItem[itemIndex];

      newCartItem[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItem;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      const item = prevState[itemIndex];
      const newCartItem = [...prevState];

      if (item.quantity === 1) {
        newCartItem.splice(itemIndex, 1);

        return newCartItem;
      }

      newCartItem[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItem;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color='#D73035' size='large'/>
          </CenteredContainer>

        ) : (
          <>

            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color='#D73035' size='large'/>
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddToCart}
                      products={products}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color='#667' style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}


          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}

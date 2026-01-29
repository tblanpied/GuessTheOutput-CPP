#include <iostream>

int main() {
    int x (5);
    int y = 5;
    int z {5};
    int k = {5};
    std::cout << x + y + z + k;
    return 0;
}

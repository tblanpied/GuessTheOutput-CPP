#include <iostream>

int main() {
    decltype({1, 2}) x = {1, 2};
    std::cout << x[0] << '\n';
}

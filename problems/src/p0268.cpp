#include <iostream>
#include <utility>

int main() {
    int x = 1;
    std::cout << std::exchange(x, 5) << x << "\n";
}

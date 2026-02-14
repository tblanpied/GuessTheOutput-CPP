#include <iostream>

struct Z {
    Z() { std::cout << '1'; }
    Z(const Z&) = delete;
    Z(Z&&) = delete;
    ~Z() { std::cout << '2'; }
};

Z make() {
    return Z();
}

int main() {
    Z obj = make();
    std::cout << '3' << "\n";
}

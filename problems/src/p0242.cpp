#include <vector>

template <class T>
void g() {
    T::value_type x{};
    (void)x;
}

int main() {
    g<std::vector<int>>();
}
